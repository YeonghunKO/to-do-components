export function addEventDragAndDrop(el) {
  el.addEventListner('dragstart', dragStart);
  el.addEventListner('dragenter', dragEnter);
  el.addEventListner('dragover', dragOver);
  el.addEventListner('dragleave', dragLeave);
  el.addEventListner('drop', dragDrop);
  el.addEventListner('dragend', dragEnd);
}

function dragStart() {
  console.log('dragStart');
}

function dragEnter() {
  console.log('dragEnter');
}

function dragOver() {
  console.log('dragOver');
}

function dragLeave() {
  console.log('dragLeave');
}

function dragDrop() {
  console.log('dragDrop');
}

function dragEnd() {
  console.log('dragEnd');
}
