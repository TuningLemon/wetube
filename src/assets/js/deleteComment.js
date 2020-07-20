/* eslint-disable prettier/prettier */
import axios from "axios";

const commentlist2 = document.getElementsByClassName("comment__renderer");

const commentNumber = document.getElementById("jsCommentNumber");

const decreaseNum = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
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
  }
};

const init = () => {
  let i = 0;
  const commentDelList = document.getElementsByClassName("comment-delete");
  for (i = 0; commentDelList.length; i += 1) {
    commentDelList[i].addEventListener("click", handleDelete);
  }
};

if (commentlist2) {
  init();
}
