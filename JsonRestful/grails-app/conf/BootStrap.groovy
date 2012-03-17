import jsonrestful.Book;
class BootStrap {

    def init = { servletContext ->
		if (!Book.count()) {
			new Book(author: "Stephen King", title: "The Shining", price:99, releaseDate: new Date()).save(failOnError: true)
			new Book(author: "James Patterson", title: "Along Came a Spider", price:79, releaseDate: new Date()).save(failOnError: true)
		}
	}
    def destroy = {
    }
}
