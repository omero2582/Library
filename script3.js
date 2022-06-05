/// CHANGING script 1 using factory functions or modules

let Library = (() =>{
    let allBooks = [];

    //cache
    const modal = document.querySelector('.modal');
    const btnNewBook = document.querySelector('.new-book');
    const btnClose = document.querySelector('.close-button');
    const btnSubmit = document.querySelector('.submit-book');
    const bookForm = document.querySelector('.book-form');
    const template = document.querySelector('template');
    const bookDisplay = document.querySelector('.book-display');

    // cache inputs
    const titleInput = document.querySelector('#book-title');
    const authorInput = document.querySelector('#book-author');
    const pagesInput = document.querySelector('#num-pages');
    const readStatusInput = document.querySelector('#read-status');

    //bind
    btnNewBook.addEventListener('click', openModal);
    window.addEventListener('click', checkTarget);
    btnClose.addEventListener('click', closeModal);
    bookForm.addEventListener('submit', submitForm);

    //modal
    function openModal(e){
        modal.style.display = 'initial';
    }
    
    function closeModal(e){
        modal.style.display = 'none';
    }
    
    function checkTarget(e){
        if (e.target === modal){
            closeModal(e);
        }
    }
    
    //DOM
    function submitForm(e){
        e.preventDefault();
        let newBook = Book(titleInput.value, authorInput.value, pagesInput.value, readStatusInput.value);
       
        addBook(newBook);
        closeModal();
        bookForm.reset();       //IMPORTANT clears form
    }
    

    function addBook (newBook){
        allBooks.push(newBook);
        renderAllBooks();
         // console.log(newBook);
    }
    
    function deleteBook(index){
        console.log(`deleted '${allBooks[index].getTitle()}'`);
        allBooks.splice(index, 1);
        renderAllBooks();
    }
    
    function renderBook(book){
        let clone = template.content.cloneNode(true);
        clone.querySelector('.title-display').textContent = book.getTitle();
        clone.querySelector('.author-display').textContent = book.getAuthor();
        let pageString = book.getNumPages()  > 1 ? 'pages' : 'page';
        clone.querySelector('.pages-display').textContent = book.getNumPages() + ` ${pageString}`;
        clone.querySelector('.read-display').value = book.getReadStatus();
        let index =  allBooks.indexOf(book);
        clone.querySelector('.book').setAttribute('data-key', index);
        clone.querySelector('.delete-btn').addEventListener('click', ()=> deleteBook(index));
        return clone;
    }
    
    function renderAllBooks(){
        bookDisplay.innerHTML="";
        allBooks.forEach( (book) =>{
            bookDisplay.appendChild(renderBook(book));
        });
        console.table(allBooks);
    }
    
    function sortBy(){
    
    }

    return {addBook, deleteBook}

})();


function Book(title, author, numPages, readStatus){
    const getTitle = () => title;
    const getAuthor = () => author;
    const getNumPages = () => numPages;
    const getReadStatus = () => readStatus;

    // return {getTitle, getAuthor, getNumPages, getReadStatus}
    return {title, author, numPages, readStatus,
            getTitle, getAuthor, getNumPages, getReadStatus}    //testing
}


/*multiplying book display for testing*/
// for (let i = 0; i < 10; i++) {
//     let clone = template.content.cloneNode(true);
//     bookDisplay.appendChild(clone)
//     }

    /****** */


 // let allInputs = Array.from(document.querySelectorAll('form input, form select'));
        // console.log(allInputs);
    
        // let newBook = allInputs.reduce( (obj, one) =>{     //TODO remove this prob, and have set Book.author properties
        //     obj[one.id] = one.value;
        //     return obj;
        // }, new Book());

        //cute loop to put all inputs into a single object, however our Book properites are now dynamic,
        //which means we cant do methods inside Book without knowing all these dynamic properties