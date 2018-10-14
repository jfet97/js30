const panels = document.querySelectorAll('.panel');


let lastPanelOpened = null;

panels.forEach((panel) => {



    panel.addEventListener('click', function handleClick() {
        // this == current panel

        // adding or removing 'open' class will fire flex-grow transition
        this.classList.add('open');
        if (lastPanelOpened) lastPanelOpened.classList.remove('open');


        lastPanelOpened = this;
    });


    panel.addEventListener('transitionend', function handleFlexGrowTransitionEnd(e) {
        // this function fires twice for each click:
        // 1) on the panel just clicked, to add 'open-active'
        // 2) on the previous panel to remove 'open-active'

        // e.propertyName; name of the finished transitions
        if (e.propertyName.includes('flex')) {
            // 'flex-grow includes flex but not viceversa, for Safari support'
            // we toggle 'open-active' class only when flex-grow transition is finished

            this.classList.toggle('open-active');
        }
    });


});