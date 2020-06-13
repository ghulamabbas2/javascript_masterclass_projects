const bookmarkBtn = document.querySelector('#bookmark_btn');
const bookmarkList = document.querySelector('.bookmarks');

document.addEventListener('DOMContentLoaded', getBookmarks);

// Get bookmarks from local storage
function getBookmarks() {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    if(!bookmarks) {
        bookmarks = [];
    }

    bookmarks.forEach(bookmark => {
        const markup = `<div class="bookmark-card">
                    <p>${bookmark.text}<span id="bookmark_id">${bookmark.id}</span></p>
                    <p id="date">Added On: ${bookmark.date}</p>
                    <a href="${bookmark.url}" class="btn btn-primary" target="_black">View</a>
                    <a href="#" id="delete_bookmark" class="btn btn-danger">Delete</a>
                </div>`;

        bookmarkList.insertAdjacentHTML('afterbegin', markup);
    });

}

// Add new bookmark
bookmarkBtn.addEventListener('click', addBookmark);

function addBookmark() {
    const text = document.querySelector('#textField').value;
    const url = document.querySelector('#urlField').value;
    const date = new Date(Date.now()).toString().substring(0, 24);

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let id;

    if(!bookmarks || bookmarks.length === 0) {
        bookmarks = [];
        id = 0;
    } else {
        id = parseInt(bookmarks[bookmarks.length - 1].id) + 1;
    }

    let bookmark = {
        "id" : id,
        "text" : text,
        "url" : url,
        "date" : date
    };

    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    const markup = `<div class="bookmark-card">
                    <p>${text}<span id="bookmark_id">${id}</span></p>
                    <p id="date">Added On: ${date}</p>
                    <a href="${url}" class="btn btn-primary" target="_black">View</a>
                    <a href="#" id="delete_bookmark" class="btn btn-danger">Delete</a>
                </div>`;

    bookmarkList.insertAdjacentHTML('afterbegin', markup);
}

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
});

// Delete Bookmark from List
bookmarkList.addEventListener('click', e => {

    if(e.target.matches('#delete_bookmark')) {
        let id = document.querySelector('#bookmark_id').textContent;
        e.target.parentElement.remove();

        removeBookmarkFromLocalStorage(id);
    }

});

// Remove bookmark from Local storage
function removeBookmarkFromLocalStorage(id) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    if(!bookmarks) {
        bookmarks = [];
    }

    bookmarks.forEach((bookmark, index) => {
        if(bookmark.id === parseInt(id)) {
            bookmarks.splice(index, 1);
        }
    });

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}