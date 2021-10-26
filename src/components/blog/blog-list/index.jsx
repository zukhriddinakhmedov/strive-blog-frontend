import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";

const url = process.env.REACT_APP_DEP_API_URL
export default class BlogList extends Component {
  state = {
    posts: [],
  }

  fetchPosts = async () => {
    try {
      const response = await fetch(`${url}/posts`)
      if (response.ok) {
        const posts = await response.json()
        this.setState({ posts })
      }
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this.fetchPosts()
  }
  render() {
    return (
      <Row>

        {this.state.posts.map((post) => (
          <Col md={4} style={{ marginBottom: 50 }}>
            <BlogItem key={post.title} {...post} />
          </Col>
        ))}
      </Row>
    );
  }
}
