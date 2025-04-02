


const form = document.getElementById("add-post");
const authorField = document.getElementById("author-field");
const dateField = document.getElementById("date-field");
const contentField = document.getElementById("content-field");
const error = document.getElementById("errorMessage");
const postArea = document.getElementById("posts");
const colourField = document.getElementById("pfpColour");
nameReverse = false;
numReverse = false;
likeReverse = false;

const examplePost = {
  ID: 0,
  author: "bAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  date: "01/10/2019",
  content:
    "Today I started using FriendFace! It's the best social media site I've ever usedn AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.",
  likes: 11
};

const examplePost2 = {
  ID: 1,
  author: "a",
  date: "01/10/2020",
  content:
    "Today I started using FriendFace! It's the best social media site I've ever used.",
  likes: 9
};

const examplePost3 = {
  ID: 2,
  author: "c",
  date: "01/10/2018",
  content:
    "Today I started using FriendFace! It's the best social media site I've ever used.",
  likes: 1
};

var posts = [examplePost,examplePost2,examplePost3,examplePost,examplePost2,examplePost3,examplePost,examplePost2,examplePost3,examplePost,examplePost2,examplePost3,examplePost,examplePost2,examplePost3,];

IDCount = posts.length;

form.onsubmit = function(event) {
  const ID = IDCount;
  IDCount++;
  const pfpColour = colourField.value;
  const author = authorField.value;
  const content = contentField.value;
  const date = dateField.value;
  const likes = 0;
  const regex = /^[A-Za-z0-9 .,!?()%&£'$'"]+$/ // keeping the regex as a variable allows us to use the .test func



  if (!regex.test(author)) 
    {
      alert("Author contains special characters!")
      return false;
    }

  if (!regex.test(content))
    {
      alert ("Content contains special characters")
      return false;
    }
  

  createPost({ID, author, date, content, likes, pfpColour});
  reloadPostList(reverse = false);

  authorField.value = "";
  contentField.value = "";
  dateField.value = "";

  event.preventDefault();
};


sortDate = function(){
  numReverse = !numReverse;
  nameReverse = false;
  likeReverse = false;
  posts.sort((a,b) => new Date(a.date) - new Date(b.date));

  if (numReverse){
    posts.reverse();
  }

  reloadPostList();
  
}

sortName = function(){

  nameReverse = !nameReverse;
  numReverse = false;
  likeReverse = false;
  posts.sort(function(a,b){
    let x = a.author.toLowerCase();
    let y = b.author.toLowerCase();
    if (x<y) {return -1;}
    if (x>y) {return 1;}
    return 0;
  });

  if (nameReverse)
    {
      posts.reverse();
    }
    reloadPostList();
}



sortLikes = function(){
  likeReverse = !likeReverse;
  numReverse = false;
  nameReverse = false;

  posts.sort((a,b) => a.likes - b.likes);

  if (likeReverse){
    posts.reverse();
  }

  reloadPostList();


}

reloadPostList = function() {
  postArea.innerHTML = "";
  
  posts.forEach(post => (postArea.innerHTML += formatPost(post)));
  console.log(posts);
};

createPost = function(post) {
  posts.push(post);
};

addLike = function(postID){
  posts.find(post => post.ID === postID).likes ++
  reloadPostList()
}

deletePost = function(postID){
  posts.pop(postID);
  reloadPostList();

}
formatPost = function(post) {
  console.log(post.ID);
  return `
    <div id = ${post.ID} class="post">
    
    <div class="author">  <div class = "pfp" style= "background-color: ${post.pfpColour};"> <img src = "http://localhost:3000/images/Silhouette.png" style = "width:30px;height:30px;"></div>>   ${post.author} on ${post.date} said:  </div> 
    
    <div class="content" > ${post.content}  </div>

    <div class ="content">  ${post.likes}  <button onclick="addLike((${post.ID}))"> Like</button> 

    <div class="content"> <button onclick="deletePost(${post.ID})"> delete </button>
    
    
    </div>
  `;
};
reloadPostList();

