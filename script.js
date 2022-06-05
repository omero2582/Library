const modal = document.querySelector('.modal');
const btnNewBook = document.querySelector('.new-book');
const btnClose = document.querySelector('.close-button');
const btnSubmit = document.querySelector('.submit-book');
const bookForm = document.querySelector('.book-form');

function openModal(e){
    modal.style.display = 'initial';
}

function checkTarget(e){
    if (e.target === modal){
        closeModal(e);
    }
}

function closeModal(e){
    modal.style.display = 'none';
}


function submitForm(e){
    e.preventDefault();
    let allInputs = Array.from(document.querySelectorAll('form input, form select'));
    console.log(allInputs);


    let newBook = allInputs.reduce( (obj, one) =>{
        obj[one.id] = one.value;
        return obj;
    }, new Book());
    // console.log(newBook);
    myLibrary.addToLibrary(newBook);
    closeModal();
    createAllBooks(); 
    bookForm.reset();       //IMPORTANT clears form
}

btnNewBook.addEventListener('click', openModal);
window.addEventListener('click', checkTarget);
btnClose.addEventListener('click', closeModal);
bookForm.addEventListener('submit', submitForm);




const template = document.querySelector('template');
let bookDisplay = document.querySelector('.book-display');



// function Book (title, author, numPages, read){
//     this.title = title;
//     this.author = author;
//     this.numPages = numPages;
//     this.read = read;
// }

function Book(){
    
}

let myLibrary = new Library();

function Library(){
    this.allBooks = [];
    this.addToLibrary = (newBook) =>{
        this.allBooks.push(newBook);
        console.table(this.allBooks);
    }
    this.removeBook = (dataIndex) =>{
        this.allBooks.splice(dataIndex, 1);
    }
}


function createBookDOM(book){

    let clone = template.content.cloneNode(true);
    clone.querySelector('.title-display').textContent = book['book-title'];
    clone.querySelector('.author-display').textContent = book['book-author'];
    let pageString = book['num-pages']  > 1 ? 'pages' : 'page';
    clone.querySelector('.pages-display').textContent = book['num-pages'] + ` ${pageString}`;
    clone.querySelector('.read-display').value = book['readSubmit'];
    let index =  myLibrary.allBooks.indexOf(book);
    clone.querySelector('.book').setAttribute('data-key', index);
    clone.querySelector('.delete-btn').addEventListener('click', ()=> deleteBtn(index));
    return clone;
}

function createAllBooks(){
    bookDisplay.innerHTML="";
    myLibrary.allBooks.forEach( (book) =>{
        bookDisplay.appendChild(createBookDOM(book));
    });
    console.log(myLibrary.allBooks);
}


/*multiplying book display for testing*/
// for (let i = 0; i < 10; i++) {
//     let clone = template.content.cloneNode(true);
//     bookDisplay.appendChild(clone)
//     }

    /****** */



/*TODO TODO */
/**PROB use a book id, with id numbers just counting up, increasin by 1 
 * Alternatively, use the array index, but these would have to be reassigned everytime a book is removed
 * something like button.addEventListener( e=> {
 *  e.parentNode.getAttribute['data-key'];
 * });
*
*   it just confuses me cause of idk how this would affect a 'sort' feature
*/

function deleteBtn(index){
    console.log(`deleted '${myLibrary.allBooks[index]['book-title']}'`);
    myLibrary.removeBook(index);
    createAllBooks();
}

function sortBy(){

}