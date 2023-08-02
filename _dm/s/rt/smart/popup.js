(function (global) {
    global.insiteScripts = global.insiteScripts || {};
    global.insiteScripts.popup =
        global.insiteScripts.popup ||
        function message(scriptOptions) {
            const dmSmartScriptDuration = scriptOptions.duration,
                dmSmartScriptSettings = scriptOptions.settings,
                dmSmartScriptRuleId = scriptOptions.ruleId,
                dmSmartScriptRuleType = scriptOptions.ruleType,
                isForced = scriptOptions.isForced;

            setTimeout(() => {
                    $.getScript(
                        "/_dm/s/rt/smart/userVisitsConditionService.js",
                        function () {
                            //popupName and settings are coming from BE
                            const shouldShowPopup = function (popupName, settings) {
                                const shouldCheckUserVisitsCondition =
                                    rtCommonProps['platform.monolith.personalization.userVisitsCondition.inClient.enabled']
                                    && settings.user_visits_number !== undefined;

                                if (shouldCheckUserVisitsCondition) {
                                    return isForced || shouldShowRuleObject(
                                        popupName, settings);
                                }
                                return isForced || $.getCookie(
                                    getSmartRuleCookieName(popupName)) === null;
                            };

                            // If insite configured to show a popup then we don't want to show it everytime, once every "popup.insite.cookie.ttl" hours.
                            const onOpenPopup = function (popupName, event) {
                                if (isForced
                                    || window.Parameters?.disableTracking) {
                                    return;
                                }
                                setSmartRuleCookie(popupName);
                            };

                            const applyPopUp = () => {
                                const settings = JSON.parse(
                                    Base64.decode(dmSmartScriptSettings));
                                const popupName = settings.popupName;
                                const delay = settings.delay;

                                const options = {
                                    onOpen: onOpenPopup.bind(null, popupName),
                                    additionalAttributes: [
                                        {
                                            name: 'data-rule',
                                            value: dmSmartScriptRuleId
                                        },
                                        {
                                            name: 'data-rule-type',
                                            value: dmSmartScriptRuleType
                                        }
                                    ]
                                };

                                const canShowPopup = shouldShowPopup(
                                    popupName, settings);

                                if (popupName && canShowPopup) {
                                    setTimeout(function () {
                                        $.dmrt.onLoad(
                                            $.dmrt.components.popupService.displayPopup.bind(
                                                null,
                                                popupName,
                                                options
                                            )
                                        );
                                        if (window.dmsnowplow) {
                                            dmsnowplow(
                                                'trackStructEvent',
                                                'insite',
                                                'impression',
                                                scriptOptions.ruleType,
                                                scriptOptions.ruleId
                                            );
                                        }
                                    }, (delay + dmSmartScriptDuration) * 1000);
                                }
                            }

                            (function () {
                                applyPopUp();
                            })();
                        }
                    );
                }, 500
            )
            ;
        };
})
(this);
