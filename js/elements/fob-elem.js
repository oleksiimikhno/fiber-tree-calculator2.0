export default class FobElement extends HTMLElement {
    constructor(name) {
        super();
        // this.count++;
        // this.dataset.fobId = count;
        // console.log(`Create element FOB ${this.dataset.fobId++}`);
        // this.firstSplit = 
       this.drag = new PlainDraggable(this, {
            // handle: document.querySelector('#fob-2 .draggable'),
            onMove: function() { line.position(); },
            // onMoveStart: function() { line.dash = {animation: true}; },
            // onDragEnd: function() { line.dash = false; },
            // handle: true,
            zIndex: 1
          });
    }

    connectedCallback() {
        console.log('Fob element in DOM');
        // this._render();
        this._addEventListeners();
    }

    disconnectedCallback() {
        console.log('remove fob element');
        this._removeEventListeners();
    }

    _addEventListeners() {
        this.addEventListener('click', this.createFob);
    }

    createFob(event) {
        const target = event.target;
        
        if (target.matches('.create-fob')) {
            let fob = document.createElement('fob-element'),
                fobHead = document.createElement('div');

                fob.classList.add('fob');

                fobHead.classList.add('fob-head', 'draggable');
                fobHead.textContent = 'Drag This';

                fob.append(fobHead);

            
            console.log(`FOB was clicked! ${this.id}`);
            console.log();
            field.append(fob)


            let btnCreateNewFob = target,
            newFob = fob,
            // wallBBox = document.getElementById('field').getBoundingClientRect(),
            line;
            // new PlainDraggable(btnCreateNewFob, {
            //     // onDrag: function(moveTo) {
            //     //   let rect = this.rect;
            //     //   if (moveTo.left < wallBBox.right && moveTo.top > wallBBox.top) { // Inside
            //     //     if (rect.left >= wallBBox.right) {
            //     //       moveTo.left = wallBBox.right;
            //     //     } else if (rect.top <= wallBBox.top) { // Avoid fixing both left and top.
            //     //       moveTo.top = wallBBox.top;
            //     //     }
            //     //   }
            //     // },
            //     // handle: document.querySelector('#fob-1 .draggable'),
            //     // onMove: function() { line.position(); },
            //     // onMoveStart: function() { line.dash = {animation: true}; },
            //     // onDragEnd: function() { line.dash = false; },
                
            //     // handle: true,
            //     zIndex: 1
            //   });
            
              new PlainDraggable(newFob, {
                handle: document.querySelector('#fob-2 .draggable'),
                onMove: function() { line.position(); },
                // onMoveStart: function() { line.dash = {animation: true}; },
                // onDragEnd: function() { line.dash = false; },
                // handle: true,
                zIndex: 1
              });
            
              line = new LeaderLine(btnCreateNewFob, newFob);


        }



        // console.log('event: ', this.event.target);
        // let target = event.target
        // console.log('event: ', target.matches('.create-split'));
        
    } 


  }

  customElements.define("fob-element", FobElement);