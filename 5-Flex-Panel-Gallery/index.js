const panels = document.querySelectorAll('.panel');


let lastPanelOpened = null;

panels.forEach((panel) => {



    panel.addEventListener('click', function handleClick() {
        // this == current panel

        // adding or removing 'open' class will fire flex-grow transition
        this.classList.add('open');
        if (lastPanelOpened) lastPanelOpened.classList.remove('open');

        // Inexplicable intuition that solves the problem encountered
        // when you open a panel, then you close it by clicking on the same panel
        // - which causes adding 'open' to a panel that already has 'open' but no problems because add() won't have effects
        // and we are immediately removing 'open' -
        // and then you try to reopen it.
        // Try lastPanelOpened = this; and you'll understand.
        // Without lastPanelOpened = lastPanelOpened == this ? null : this;
        // you'll add 'open' that is what you want this time, but immediately removie it because 
        // lastPanelOpened points to the current panel. 
        // The last time was necessary, this time is wrong.
        // I said, this is inexplicable.
        lastPanelOpened = lastPanelOpened == this ? null : this;
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
