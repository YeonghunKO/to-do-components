import { selector } from '../utils/selector.js';
import {
  listContainerTemp,
  listTempArray,
  singleListNode,
  editTemp,
  listRestoreTemp,
} from '../utils/template.js';

import { addEventDragAndDrop } from '../utils/addDragAndDrop.js';

export default function Todo({
  $target,
  initialState,
  onDelete,
  onFinished,
  onPending,
  onEdit,
}) {
  this.state = initialState;

  $target.appendChild(listContainerTemp());
  const $pendingList = selector('#pending-list');
  const $finishedList = selector('#finished-list');
  const $listContainer = selector('.list');

  this.setState = (nextState, renderType, $li, parentId) => {
    this.state = nextState;
    this.render(renderType, $li, parentId);
  };

  this.render = (renderType, $li, parentId) => {
    const { pending, finished } = this.state;
    if (renderType === 'submit') {
      const lastPendingTaskObj = pending[pending.length - 1];
      const $lastPendingLi = singleListNode(lastPendingTaskObj, 'pending');
      addEventDragAndDrop($lastPendingLi);
      $pendingList.appendChild($lastPendingLi);
    } else if (renderType === 'onPending') {
      $finishedList.removeChild($li);
      const value = $li.querySelector('span:nth-of-type(2)').innerText;
      const $pendingLi = singleListNode({ id: $li.id, value }, 'pending');
      addEventDragAndDrop($pendingLi);
      $pendingList.appendChild($pendingLi);
    } else if (renderType === 'onFinished') {
      $pendingList.removeChild($li);
      const value = $li.querySelector('span:nth-of-type(2)').innerText;
      const $finishedLi = singleListNode({ id: $li.id, value }, 'finished');
      addEventDragAndDrop($finishedLi);
      $finishedList.appendChild($finishedLi);
    } else if (renderType === 'delete') {
      if (parentId === 'pending-list') {
        $pendingList.removeChild($li);
      } else {
        $finishedList.removeChild($li);
      }
    } else if (renderType === 'init') {
      $pendingList.innerHTML = listTempArray(pending, 'pending');
      $finishedList.innerHTML = listTempArray(finished, 'finished');

      const $listSection = selector('.list');
      const $lists = $listSection.querySelectorAll('li');
      $lists.forEach(list => {
        addEventDragAndDrop(list);
      });
    }
  };

  $listContainer.addEventListener('click', e => {
    const { classList } = e.target;
    const $li = e.target.closest('li');
    if ($li) {
      const $parent = $li.parentElement;
      if (classList.contains('fa-edit')) {
        const originalLiVal = $li.querySelector(
          'span:nth-of-type(2)'
        ).innerText;

        $li.innerHTML = editTemp();
        const $editInput = selector('.todo-edit__input');
        $editInput.focus();
        $editInput.value = originalLiVal;
        $editInput.addEventListener('keyup', e => {
          const listType = $li.parentElement.id;
          const { key } = e;

          if (key === 'Enter') {
            const { id } = $li;
            const { value } = $editInput;
            if (!value.length) {
              alert('한 글자 이상 입력하기!');
              return;
            }
            $li.innerHTML = listRestoreTemp(value, listType);
            onEdit(id, value, listType);
          } else if (key === 'Escape') {
            $li.innerHTML = listRestoreTemp(originalLiVal, listType);
          }
        });
      } else if (classList.contains('fa-check-square')) {
        onFinished($li);
      } else if (classList.contains('fa-backward')) {
        onPending($li);
      } else if (classList.contains('fa-trash-alt')) {
        onDelete($li, $parent.id);
      }
    }
  });
}
