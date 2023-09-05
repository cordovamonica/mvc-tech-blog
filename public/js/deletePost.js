const delButton = document.querySelector('#deletePost');
const postId = document.querySelector('input[name="post-id"]').value;

const delButtonHandler = async function(event) {
    event.preventDefault();
    await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    });
    document.location.replace('/dashboard');
}
if (response.ok) {
    document.location.replace('/dashboard');
} else {
    alert(response.statusText);
}

if(delButton!=null){
    delButton.addEventListener('click', delButtonHandler);
}