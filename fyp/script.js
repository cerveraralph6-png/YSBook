function createPost() {
  const text = document.getElementById("postText").value.trim();
  const mediaInput = document.getElementById("mediaInput");
  const feed = document.getElementById("feed");

  if (!text && !mediaInput.files[0]) {
    alert("Please write something or upload media.");
    return;
  }

  const post = document.createElement("div");
  post.className = "post";

  if (text) {
    const p = document.createElement("p");
    p.textContent = text;
    post.appendChild(p);
  }

  if (mediaInput.files[0]) {
    const file = mediaInput.files[0];
    const url = URL.createObjectURL(file);
    if (file.type.startsWith("image/")) {
      const img = document.createElement("img");
      img.src = url;
      post.appendChild(img);
    } else if (file.type.startsWith("video/")) {
      const video = document.createElement("video");
      video.src = url;
      video.controls = true;
      post.appendChild(video);
    }
  }

  const stats = document.createElement("div");
  stats.className = "stats";
  stats.innerHTML = `<span class="like-count">0</span> Reactions · <span class="comment-count">0</span> Comments`;
  post.appendChild(stats);

  const actions = document.createElement("div");
  actions.className = "post-actions";
  actions.innerHTML = `
    <button onclick="toggleReactions(this)">😀 React</button>
    <button onclick="toggleComments(this)">💬 Comment</button>
    <button>🔄 Share</button>
    <div class="reaction-options">
      <span onclick="react(this,'👍')">👍</span>
      <span onclick="react(this,'❤️')">❤️</span>
      <span onclick="react(this,'😆')">😆</span>
      <span onclick="react(this,'😮')">😮</span>
      <span onclick="react(this,'😢')">😢</span>
      <span onclick="react(this,'😡')">😡</span>
    </div>
  `;
  post.appendChild(actions);

  const comments = document.createElement("div");
  comments.className = "comments";
  comments.style.display = "none";
  comments.innerHTML = `
    <div class="comment-box">
      <input type="text" placeholder="Write a comment...">
      <button onclick="addComment(this)">Post</button>
    </div>
    <div class="comment-list"></div>
  `;
  post.appendChild(comments);

  feed.prepend(post);

  document.getElementById("postText").value = "";
  mediaInput.value = "";
}

function toggleReactions(btn) {
  const container = btn.parentElement;
  const options = container.querySelector(".reaction-options");
  options.style.display = options.style.display === "block" ? "none" : "block";
}

function react(span, emoji) {
  const container = span.closest("div");
  const reactBtn = container.parentElement.querySelector("button");
  reactBtn.textContent = emoji + " Reacted";

  const post = span.closest(".post");
  if (post) {
    const likeCountElem = post.querySelector(".like-count");
    if (likeCountElem) {
      let likeCount = parseInt(likeCountElem.textContent);
      likeCountElem.textContent = likeCount + 1;
    }
  }
  container.style.display = "none";
}

function toggleComments(btn) {
  const post = btn.closest(".post");
  const comments = post.querySelector(".comments");
  comments.style.display =
    comments.style.display === "none" ? "block" : "none";
}

function addComment(btn) {
  const post = btn.closest(".post");
  const input = post.querySelector(".comment-box input");
  const commentList = post.querySelector(".comment-list");
  const commentCountElem = post.querySelector(".comment-count");

  if (input.value.trim() === "") return;

  const newComment = document.createElement("div");
  newComment.className = "comment";
  newComment.innerHTML = `
    ${input.value}
    <div class="comment-actions">
      <button class="reply-btn" onclick="showReplyBox(this)">Reply</button>
      <button onclick="toggleReactions(this)">😀 React</button>
      <div class="reaction-options">
        <span onclick="react(this,'👍')">👍</span>
        <span onclick="react(this,'❤️')">❤️</span>
        <span onclick="react(this,'😆')">😆</span>
        <span onclick="react(this,'😮')">😮</span>
        <span onclick="react(this,'😢')">😢</span>
        <span onclick="react(this,'😡')">😡</span>
      </div>
    </div>
    <div class="reply-list"></div>
  `;
  commentList.appendChild(newComment);

  input.value = "";
  let commentCount = parseInt(commentCountElem.textContent);
  commentCountElem.textContent = commentCount + 1;
}

function showReplyBox(btn) {
  const container = btn.closest(".comment, .reply");
  let replyBox = container.querySelector(".reply-box");

  if (replyBox) {
    replyBox.remove();
  } else {
    replyBox = document.createElement("div");
    replyBox.className = "reply-box";
    replyBox.innerHTML = `
      <input type="text" placeholder="Write a reply...">
      <button onclick="addReply(this)">Reply</button>
    `;
    container.appendChild(replyBox);
  }
}

function addReply(btn) {
  const container = btn.closest(".comment, .reply");
  const input = container.querySelector(".reply-box input");
  const replyList = container.querySelector(".reply-list");

  if (input.value.trim() === "") return;

  const reply = document.createElement("div");
  reply.className = "reply";
  reply.innerHTML = `
    ${input.value}
    <div class="reply-actions">
      <button class="reply-btn" onclick="showReplyBox(this)">Reply</button>
      <button onclick="toggleReactions(this)">😀 React</button>
      <div class="reaction-options">
        <span onclick="react(this,'👍')">👍</span>
        <span onclick="react(this,'❤️')">❤️</span>
        <span onclick="react(this,'😆')">😆</span>
        <span onclick="react(this,'😮')">😮</span>
        <span onclick="react(this,'😢')">😢</span>
        <span onclick="react(this,'😡')">😡</span>
      </div>
    </div>
    <div class="reply-list"></div>
  `;
  replyList.appendChild(reply);

  input.value = "";
}

function logout() {
  window.location.href = "../Login/logout.php";
}
