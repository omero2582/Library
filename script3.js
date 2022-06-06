/// CHANGING script 1 using factory functions or modules

let Library = (() =>{
    let allBooks = [];
    let bookId = 0; //counting up
    let sortMethod;

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
    const sortInput = document.querySelector('#sort');
    sortMethod = sortInput.value;

    //bind
    btnNewBook.addEventListener('click', openModal);
    window.addEventListener('click', checkTarget);
    btnClose.addEventListener('click', closeModal);
    bookForm.addEventListener('submit', submitForm);
    sortInput.addEventListener('change', () =>{
        sortMethod = sortInput.value;
        renderAllBooks() });

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
        let newBook = Book(bookId, titleInput.value, authorInput.value, pagesInput.value, readStatusInput.value);
       
        addBook(newBook);
        closeModal();
        bookForm.reset();       //IMPORTANT clears form
    }
    

    function addBook (newBook){
        allBooks.push(newBook);
        renderAllBooks();
        bookId++;
    }
    
    function deleteBook(index){
        console.log(`deleted '${allBooks[index].getTitle()}'`);
        allBooks.splice(index, 1);
        renderAllBooks();
    }

    function renderBook(book){
        let clone = template.content.cloneNode(true);
        let pageString = book.getNumPages()  > 1 ? 'pages' : 'page';
        let readDisplay = clone.querySelector('#read-display');
        let index =  allBooks.indexOf(book);
        clone.querySelector('.title-display').textContent = book.getTitle();
        clone.querySelector('.author-display').textContent = book.getAuthor();  
        clone.querySelector('.pages-display').textContent = book.getNumPages() + ` ${pageString}`;
        readDisplay.value = book.getReadStatus();
        readDisplay.addEventListener('change', () => book.setReadStatus(readDisplay.value));
        
        clone.querySelector('.book').setAttribute('data-key', index);
        clone.querySelector('.delete-btn').addEventListener('click', ()=> deleteBook(index));
        return clone;
    }
    
    function renderAllBooks(){
        sortBy(sortMethod);
        bookDisplay.innerHTML="";
        allBooks.forEach( (book) =>{
            bookDisplay.appendChild(renderBook(book));
        });
        logBooks();
    }
    
    function sortBy(method){
        switch(method){
            case 'Newest Added':
                allBooks.sort( (a, b) => b.getBookId() - a.getBookId());
                break;
            case 'Oldest Added':
                allBooks.sort( (a, b) => a.getBookId() - b.getBookId());
                break;
            case 'Title A-Z':
                allBooks.sort( (a,b) => a.getTitle().localeCompare(b.getTitle()));
                break;
            case 'Title Z-A':
                allBooks.sort( (a,b) => b.getTitle().localeCompare(a.getTitle()));
                break;
            case 'Author A-Z':
                allBooks.sort( (a,b) => a.getAuthor().localeCompare(b.getAuthor()));
                break;
            case 'Author Z-A':
                allBooks.sort( (a,b) => b.getAuthor().localeCompare(a.getAuthor()));
                break;
            case 'Pages Descending':
                allBooks.sort( (a,b) => b.getNumPages() - a.getNumPages());
                break;
            case 'Pages Ascending':
                allBooks.sort( (a,b) =>  a.getNumPages() - b.getNumPages());
                break;
            default:
                console.log(`sorting method '${sortMethod}' not supported`);
        }
        console.log(`sorted by ${sortMethod}`);
    }

    function logBooks(){
        console.table(allBooks.map( one => one.toObj()));
    }

    return {addBook, deleteBook, logBooks, allBooks, bookId, sortMethod}

})();


function Book(bookId, title, author, numPages, readStatus){
    const getBookId = () => bookId;
    const getTitle = () => title;
    const getAuthor = () => author;
    const getNumPages = () => numPages;
    const getReadStatus = () => readStatus;
    const setReadStatus = (status) => {
        readStatus = status; console.log(`read Status of ${title} set to ${status}`);
        Library.logBooks();
    };
    const toObj = () => {
        return {bookId, title, author, numPages, readStatus}
    }

    return {getBookId, getTitle, getAuthor, getNumPages, getReadStatus, setReadStatus, toObj}   
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