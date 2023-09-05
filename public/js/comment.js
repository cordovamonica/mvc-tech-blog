const postId = document.querySelector('input[name="post-id"]').value;

const commentFormHandler = async function(event) {
    event.preventDefault();
    const commentText = document.querySelector('textarea[name="comment-body"]').value.trim();
    if (commentText) {
        await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                commentText
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        document.location.reload();
    }
}

document.querySelector('#new-comment-form').addEventListener('submit', commentFormHandler);
const delButtonHandler = async function(event) {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        await fetch(`/api/comments/${id}`, {
            method: 'DELETE'
        });
        document.location.reload();
    }
}
document.querySelector('.comment-list').addEventListener('click', delButtonHandler);

