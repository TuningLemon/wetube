/* eslint-disable prettier/prettier */
import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

// delete Comment

const decreaseNum = () => {
  commentNumber.textContent = parseInt(commentNumber.textContent, 10) - 1;
};

const handleDelete = async (event) => {
  const commentId = event.target.parentNode.firstElementChild.textContent;

  const response = await axios({
    url: `/api/${commentId}/delete`,
    method: "POST",
  });

  if (response.status === 200) {
    event.target.closest("li").remove(); // 이런식으로 삭제하려는 li 전체 태그를 받아와 삭제시킬 수 있음
    decreaseNum();
  } else {
    alert("Hello delete Err!");
  }
};

const initForDelete = () => {
  let i = 0;
  const commentDelList = document.getElementsByClassName("comment-delete");
  for (i = 0; commentDelList.length; i += 1) {
    commentDelList[i].addEventListener("click", handleDelete);
  }
};

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (comment, id) => {
  const commentRenderer = document
    .querySelector(".comment__renderer")
    .cloneNode(true);
  commentRenderer.style.display = "block";
  let item = commentRenderer.firstElementChild;
  item.textContent = id;
  item = item.nextElementSibling;
  item.textContent = comment;
  commentList.prepend(commentRenderer);
  increaseNumber();
  initForDelete();
  // const li = document.createElement("li");
  // const span = document.createElement("span");
  // const span2 = document.createElement("span");
  // const btn = document.createElement("button");
  // span.textContent = id;
  // span2.textContent = comment;
  // li.append(span);
  // li.append(span2);
  // li.append(btn);
  // commentList.prepend(li);
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    const newCommentId = response.data;
    addComment(comment, newCommentId);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
  initForDelete();
}
