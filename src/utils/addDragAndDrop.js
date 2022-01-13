let dragSrcEl;
const DRAG_DATA_NAME = 'originalContent';

export function addEventDragAndDrop(el) {
  el.addEventListener('dragstart', dragStart);
  el.addEventListener('dragenter', dragEnter);
  el.addEventListener('dragover', dragOver);
  el.addEventListener('dragleave', dragLeave);
  el.addEventListener('drop', dragDrop);
  el.addEventListener('dragend', dragEnd);
}

function dragStart(e) {
  this.style.opacity = 0.4;
  dragSrcEl = this;
  const dataObj = { content: this.innerHTML, id: this.id };
  e.dataTransfer.setData(DRAG_DATA_NAME, JSON.stringify(dataObj));
}

function dragEnter() {
  this.classList.add('over');
}

function dragOver(e) {
  e.preventDefault();
}

function dragLeave() {
  this.classList.remove('over');
}

function dragDrop(e) {
  if (dragSrcEl !== this) {
    const { content, id } = JSON.parse(e.dataTransfer.getData(DRAG_DATA_NAME));
    dragSrcEl.innerHTML = this.innerHTML;
    dragSrcEl.id = this.id;
    this.innerHTML = content;
    this.id = id;
  }
  this.classList.remove('over');
}

function dragEnd() {
  this.style.opacity = 1;
}
