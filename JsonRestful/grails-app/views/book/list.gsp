<%@ page import="jsonrestful.Book" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
	<head>
	 <link rel="stylesheet" type="text/css" href="../extjs/resources/css/ext-all.css" />
	 <link rel="stylesheet" type="text/css" href="../extjs/examples/shared/example.css" />
	 <script type="text/javascript" src="../extjs/bootstrap.js"></script>
	 <script type="text/javascript" src="../extjs/locale/ext-lang-zh_CN.js"></script>
	 <script type="text/javascript" src="../extjs/examples/shared/examples.js"></script>
	 <script type="text/javascript" src="../extjs/book/bookList.js"></script>
	 
	 <style type="text/css">
        #search-results a {
            color: #385F95;
            font:bold 11px tahoma, arial, helvetica, sans-serif;
            text-decoration:none;
        }
        
       .add {
            background-image:url(../extjs/examples/shared/icons/fam/cog.gif) !important;
        }
		
        #search-results a:hover {
            text-decoration:underline;
        }
        
        #search-results p {
            margin:3px !important;
        }
        
        .search-item {
            font:normal 11px tahoma, arial, helvetica, sans-serif;
            padding:3px 10px 3px 10px;
            border:1px solid #fff;
            border-bottom:1px solid #eeeeee;
            white-space:normal;
            color:#555;
        }
        .search-item h3 {
            display:block;
            font:inherit;
            font-weight:bold;
            color:#222;
        }

        .search-item h3 span {
            float: right;
            font-weight:normal;
            margin:0 0 5px 5px;
            width:100px;
            display:block;
            clear:none;
        }
        
        .x-form-clear-trigger {
            background-image: url(../extjs/resources/themes/images/default/form/clear-trigger.gif);
        }
        
        .x-form-search-trigger {
            background-image: url(../extjs/resources/themes/images/default/form/search-trigger.gif);
        }
   </style>
		
		<meta name="layout" content="main">
		<meta http-equiv="comtent-type" content="text/html" charset="UTF-8">
	</head>
	<body>
	  <div id="books"></div>
	</body>
</html>
