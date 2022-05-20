let i = 1
export default class SplitElement extends HTMLElement {
    constructor(name) {
        super();
        // this.i = i;
        // this.count++;
        // this.dataset.fobId = count;
        // console.log(`Create element FOB ${this.dataset.fobId++}`);
        // setTimeout(() => {
        //     this.createSplit();
        // }, 1);
    }

    connectedCallback() {
        console.log('Split element in DOM');
        // this._render();
        this._addEventListeners();
    }

    disconnectedCallback() {
        console.log('remove Split element');
        this._removeEventListeners();
    }

    _addEventListeners() {
        this.addEventListener('click', this.createSplit);
    }

    createSplit(event) {
        const target = event.target;

        if (target.matches('.create-split')) {
            i++;
            let split = document.createElement('split-element');
            split.classList.add('row', 'split');
            split.id = `#split-${i}`;

            var rect = this.getBoundingClientRect();
            
            // this.style.marginBottom ='150px'

            
            this.style.marginTop ='70px'
            split.style.transform = `translate(80px, 80px)`

            split.innerHTML = 
                `<div class="row split-selected">
                    <select class="select-type">
                        <option value="FBT">FBT</option>
                        <option value="PLC">PLC</option>
                    </select>
                    <select class="select-fiber">
                        <option value="5_95">5/95</option>
                        <option value="10_90">10/90</option>
                        <option value="15_85">15/85</option>
                    </select>
                </div>
                <div class="vertical-center"><input id="in-signal" class="in-split" name="in-signal" value="0"></div>
                <div class="column out-split">
                    <div class="split-out row" data-id="0">
                        <input class="out-signal" data-id="0" name="out-split" value="0" disabled="">
                        <button class="btn-split create-split">+</button>
                        <svg class="icon icon-out green create-fob"><use xlink:href="icon/icon.symbol.svg#arrow-right-line"></use></svg>
                    </div>
                    <div class="split-out row" data-id="0">
                        <input class="out-signal" data-id="0" name="out-split" value="0" disabled="">
                        <button class="btn-split create-split">+</button>
                        <svg class="icon icon-out green create-fob"><use xlink:href="icon/icon.symbol.svg#arrow-right-line"></use></svg>
                    </div>
                </div>`;
            this.insertAdjacentElement('afterend', split);


// console.log(this.parentElement);
//            const createLineToSplit = new LeaderLine(target, split);

//            new PlainDraggable(target, {
//                 handle: this.parentElement,
//                 onMove: function() { line.position(); },
//            })

//            new PlainDraggable(target, {
//             handle: this.parentElement,
//             onMove: function() { createLineToSplit.position(); },
//             })

//            new PlainDraggable(split, {
//             handle: this.parentElement,
//             onMove: function() { createLineToSplit.position(); },
//             // onMoveStart: function() { line.dash = {animation: true}; },
//             // onDragEnd: function() { line.dash = false; },
//             // handle: true, 
//           });
            // new PlainDraggable(target, {
            //     handle: document.querySelector('#split-3'),
            //     onMove: function() { line.position(); },
            //     onMoveStart: function() { line.dash = {animation: true}; },
            //     onDragEnd: function() { line.dash = false; },
                
            //     // handle: true,
            //     zIndex: 1
            //   });


            let target1 = target,
            target2 = split,
            line;
          // wallBBox = {
          //   top: wallBBox.top + window.pageYOffset - target1.getBoundingClientRect().height,
          //   right: wallBBox.right + window.pageXOffset
          // };
        
          new PlainDraggable(target1, {
            // },
            // handle: document.querySelector('#fob-1 .draggable'),
            onMove: function() { line.position(); },
            handle: true,
            zIndex: 1
          });
        
          new PlainDraggable(target2, {
            // handle: document.querySelector('#fob-2 .draggable'),
            onMove: function() { line.position(); },
            handle: true,
            zIndex: 1
          });
        
          line = new LeaderLine(target1, target2);


    console.log('parent:', this.parentElement);
    this.parentElement.addEventListener('dragover', AnimEvent.add(function() {
      console.log(target1);
      line.position();
    }), false);

        //   window.addEventListener('resize', AnimEvent.add(function() {
        //     line.position();
        //   }), false);


        //   window.addEventListener('resize', listener, false);




        }



        // const target = event.target;
        // console.log('this create split');



//         if (target.matches('.create-split')) {
//             let split = document.createElement('split-element')
//             split.textContent = '123'
//             console.log(`Split was clicked! ${this.id}`);
 
//             console.log('this: ', );
// this.insertAdjacentElement('afterend', split)
//             // this.insertAdjacentHTML("afterend", '<split-element>123</split-element>');
//         }
        // console.log('event: ', this.event.target);
        // let target = event.target
        // console.log('event: ', target.matches('.create-split'));
        
    } 
}

  customElements.define("split-element", SplitElement);