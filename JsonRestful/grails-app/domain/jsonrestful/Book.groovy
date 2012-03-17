package jsonrestful

import java.util.Date;

class Book {

	static expose = 'book'
	
	String title
	String author
	double price


	static api = [
		//excludedFields: [ "fullName" ],
		list : { params -> Book.list(params) },
		count: { params -> Book.count() }
	  ]

	static constraints = {
		title()
		author()
		price()
	}
}
