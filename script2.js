/// CHANGING script 1 using factory functions or modules

(() =>{
    let allBooks = [];

    //cache
    const modal = document.querySelector('.modal');
    const btnNewBook = document.querySelector('.new-book');
    const btnClose = document.querySelector('.close-button');
    const btnSubmit = document.querySelector('.submit-book');
    const bookForm = document.querySelector('.book-form');
    const template = document.querySelector('template');
    const bookDisplay = document.querySelector('.book-display');

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
        let allInputs = Array.from(document.querySelectorAll('form input, form select'));
        console.log(allInputs);
    
        let newBook = allInputs.reduce( (obj, one) =>{     //TODO remove this prob, and have set Book.author properties
            obj[one.id] = one.value;
            return obj;
        }, new Book());
       
        addBook(newBook);
        closeModal();
        renderAllBooks(); 
        bookForm.reset();       //IMPORTANT clears form
    }
    
    
    function Book(){
        
    }
    
    

    function addBook (newBook){
        this.allBooks.push(newBook);
         // console.log(newBook);
    }
    
    function deleteBook(index){
        console.log(`deleted '${allBooks[index]['book-title']}'`);
        allBooks.splice(index, 1);
        renderAllBooks();
    }
    
    function renderBook(book){
        let clone = template.content.cloneNode(true);
        clone.querySelector('.title-display').textContent = book['book-title'];
        clone.querySelector('.author-display').textContent = book['book-author'];
        let pageString = book['num-pages']  > 1 ? 'pages' : 'page';
        clone.querySelector('.pages-display').textContent = book['num-pages'] + ` ${pageString}`;
        clone.querySelector('.read-display').value = book['readSubmit'];
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

})();




/*multiplying book display for testing*/
// for (let i = 0; i < 10; i++) {
//     let clone = template.content.cloneNode(true);
//     bookDisplay.appendChild(clone)
//     }

    /****** */


