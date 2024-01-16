window.addEventListener('load', () => {
        const booking = document.getElementById('script')

        function replaceTextOnPage(from, to) {
            getAllTextNodes().forEach(function (node) {
                node.nodeValue = node.nodeValue.replace(new RegExp(quote(from), 'g'), to);
            });

            function getAllTextNodes() {
                var result = [];

                (function scanSubTree(node) {
                    if (node.childNodes.length)
                        for (var i = 0; i < node.childNodes.length; i++)
                            scanSubTree(node.childNodes[i]);
                    else if (node.nodeType == Node.TEXT_NODE)
                        result.push(node);
                })(booking);

                return result;
            }

            function quote(str) {
                return (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
            }
        }

        replaceTextOnPage('Гостей', 'Автомобилей'); // Первый аргумент - что меняем, второй - на что (при загрузке)

        var mutationObserver = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                //   console.log(mutation);
                replaceTextOnPage('Гостей', 'Автомобилей');// Первый аргумент - что меняем, второй - на что (при изменениях на сайте)
            });
        });

        mutationObserver.observe(document.documentElement, {
            childList: true,
            subtree: true,
        });
    });
