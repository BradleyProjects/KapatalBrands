var lead_generation_widget = (function() {
    var leadGenerationProtocol = 'https://';
    var leadGenerationHostname = '-lead-generation.prospect.silktide.com';

    return {
        getForm: function(toolKey) {
            const maxTries = 10;
            let attemptedTries = 0;

            let interval = setInterval(() => {
                var iframeElement = document.getElementById('lead-generation-widget');

                if (iframeElement) {
                    var height = iframeElement.getAttribute('insites-height');
                    if (!height) {
                        height = iframeElement.getAttribute('silktide-height');
                    }
                    if (!height) {
                        height = 400;
                    }
                    var width;
                    if (iframeElement.getAttribute('insites-fullwidth') === 'true' || iframeElement.getAttribute('silktide-fullwidth') === 'true') {
                        width = '100%';
                    } else {
                        width = iframeElement.getAttribute('insites-width');
                        if (!width) {
                            width = iframeElement.getAttribute('silktide-width');
                        }
                        if (!width) {
                            width = 400;
                        }
                    }
                    var border = (iframeElement.getAttribute('insites-noborder') === 'true' || iframeElement.getAttribute('silktide-noborder') === 'true') ? 'none' : '1px solid black';
                    if (iframeElement) {
                        var toolUrl = leadGenerationProtocol + toolKey + leadGenerationHostname + '/en_GB/lead-generation/view-tool/code/' + toolKey;
                        iframeElement.innerHTML = '<iframe id="leadGenerationIframe" src="' + toolUrl + '" title="Lead generation" width="'+width+'" height="' + height + '" style="border: '+border+'" sandbox="allow-top-navigation allow-scripts allow-forms allow-same-origin"></iframe>';
                    }

                    clearInterval(interval);
                } else {
                    attemptedTries++;

                    if (attemptedTries > maxTries) {
                        console.warn('Insites lead generation widget was included, but we did not find an empty div with the ID ib-form-widget on the page.');
                        clearInterval(interval);
                    }
                }
            }, 500);
        }
    };
}() || lead_generation_widget);
