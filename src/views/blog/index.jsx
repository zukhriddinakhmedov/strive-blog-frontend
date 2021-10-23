import React, { Component } from "react";
import { Container, Image } from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
import BlogLike from "../../components/likes/BlogLike";
// import posts from "../../data/posts.json";
import "./styles.css";

const url = process.env.REACT_APP_API_URL
class Blog extends Component {
  state = {
    post: {},
    loading: true,
  };

  fetchPosts = async () => {
    try {
      const response = await fetch(`${url}/posts`)
      if (response.ok) {
        const posts = await response.json()
        const { id } = this.props.match.params
        const post = posts.find((post) => post.id === id)
        if (post) {
          this.setState({ post, loading: false })
        } else {
          this.props.history.push("/404")
        }
      }
    } catch (error) {
      console.log(error)
    }
  }


  componentDidMount() {
    this.fetchPosts()
  }

  render() {
    const { loading, post } = this.state;
    if (loading) {
      return <div>loading</div>;
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={post.cover} fluid />
            <h1 className="blog-details-title">{post.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...post.author} />
              </div>
              <div className="blog-details-info">
                <div>{post.createdAt}</div>
                <div>{`${post.readTime.value} ${post.readTime.unit} read`}</div>
                <div style={{ marginTop: 20 }}>
                  <BlogLike defaultLikes={["123"]} onChange={console.log} />
                </div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            {/* <Button as={Link} to={"/new/" + post.id}>
              Edit
            </Button> */}
          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);
