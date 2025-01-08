import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;

app.use(express.static("public"));

// app.use(methodOverride('X-HTTP-Method-Override'));

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: true }));

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

const blogCategories = [
    "Fitness",
    "Health",
    "Food",
    "Culture",
    "Travel"
];

class BlogPost {
	constructor(title, category, author, text) {
		this.title = title;
		this.category = category;
		this.author = author;
		this.date = new Date();
		this.text = text;
	}

	getDate() {
		return this.date.getDate() + " " + monthNames[this.date.getMonth()] + ", " + this.date.getFullYear();
	}
};

// Last is most recent
const blogPosts = [
	new BlogPost(
		"Running technique",
		0,
		"Ginny",
		"<p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing</strong> elit. Donec urna turpis, condimentum nec dictum et, <em>tempus</em> eget odio.</p><hr><p>Curabitur luctus ut neque vitae mollis. Donec eget <em>tellus</em> eu velit faucibus suscipit eget sit amet odio. Fusce elementum lacus sit amet magna vestibulum, ut <strong>convallis</strong> leo eleifend.</p><p>Nulla tortor dolor, fringilla eget ullamcorper eget, hendrerit in metus. Pellentesque pellentesque ex sapien, eu ornare risus gravida sit amet.</p><p>Pellentesque sodales arcu eros, a <strong>bibendum</strong> lectus dictum vel. Maecenas aliquet dolor dapibus, commodo lorem vel, tincidunt erat. Nullam vehicula magna in leo commodo venenatis. Suspendisse potenti.</p>"
	),
	new BlogPost(
		"Cholesterol: the good, the bad and the ugly",
		1,
		"Abby",
		"<p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing</strong> elit. Donec urna turpis, condimentum nec dictum et, <em>tempus</em> eget odio.</p><p>Curabitur luctus ut neque vitae mollis. Donec eget <em>tellus</em> eu velit faucibus suscipit eget sit amet odio. Fusce elementum lacus sit amet magna vestibulum, ut <strong>convallis</strong> leo eleifend.</p><p>Nulla tortor dolor, fringilla eget ullamcorper eget, hendrerit in metus. Pellentesque pellentesque ex sapien, eu ornare risus gravida sit amet.</p><p>Pellentesque sodales arcu eros, a <strong>bibendum</strong> lectus dictum vel. Maecenas aliquet dolor dapibus, commodo lorem vel, tincidunt erat. Nullam vehicula magna in leo commodo venenatis. Suspendisse potenti.</p>"
	),
	new BlogPost(
		"Switzerland: the Alpine trail, marmots and fondue",
		4,
		"Lana",
		"<p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing</strong> elit. Donec urna turpis, condimentum nec dictum et, <em>tempus</em> eget odio.</p><p>Curabitur luctus ut neque vitae mollis. Donec eget <em>tellus</em> eu velit faucibus suscipit eget sit amet odio. Fusce elementum lacus sit amet magna vestibulum, ut <strong>convallis</strong> leo eleifend.</p><p>Nulla tortor dolor, fringilla eget ullamcorper eget, hendrerit in metus. Pellentesque pellentesque ex sapien, eu ornare risus gravida sit amet.</p><hr><p>Pellentesque sodales arcu eros, a <strong>bibendum</strong> lectus dictum vel. Maecenas aliquet dolor dapibus, commodo lorem vel, tincidunt erat. Nullam vehicula magna in leo commodo venenatis. Suspendisse potenti.</p>"
	)
];

/* Post Viewing: The home page should allow the user to view all their posts. */
app.get("/", (req, res) => {
	res.render("index.ejs", {
		blogPosts,
		categories: blogCategories
	});
});

app.get("/entries/new", (req, res) => {
	res.render("submitEntry.ejs", {
		categories: blogCategories
	});
});

app.get("/entries/:id", (req, res) => {
	const id = req.params.id;
	if (id) {
		res.render("submitEntry.ejs", {
			categories: blogCategories,
			blogPosts,
			id: id
		});
	}
});

/* Post Creation: Users should be able to create new posts. */
app.post("/entries", (req, res) => {
	blogPosts.push(new BlogPost(
		req.body.title,
		req.body.category,
		req.body.author,
		req.body.blogContent
	));
	res.redirect("/");
});

/* Post Update/Delete: Users should be able to edit and delete posts as needed. */
app.put("/entries/:id", (req, res) => {
	const id = req.params.id;
	if (id) {
		blogPosts[id]["title"] = req.body.title;
		blogPosts[id]["category"] = req.body.category;
		blogPosts[id]["text"] = req.body.blogContent;
	}
	res.redirect("/");
});

app.delete("/entries/:id", (req, res) => {
	if (req.params.id) {
		blogPosts.splice(req.params.id, 1);
	}
	res.redirect("/");
});

app.listen(port, () => {
	console.log(`Listening to port ${ port }`)
});