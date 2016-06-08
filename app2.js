const ProductList = React.createClass({
  getInitialState: function() {
    return {
      products: Data,
      sort: 'desc'
    };
  },
  switchSort: function(){
    let newDir = this.state.sort === 'desc' ? 'asc' : 'desc';
    this.setState({products: this.state.products, sort: newDir});
  },
  handleVote: function(productId, sign) {
    let newProducts = this.state.products.map((el) => {
      if (el.id === productId) {
        return Object.assign({}, el, {votes: el.votes+sign});
      }
      else return el;
    });
    this.setState({products: newProducts, sort: this.state.sort});
  },
  render: function() {
    let sortedProducts;
    if (this.state.sort === 'desc')
      sortedProducts = this.state.products.concat().sort( (a,b) => b.votes-a.votes);
    else
      sortedProducts = this.state.products.concat().sort( (a,b) => a.votes-b.votes);
    const products = sortedProducts.map((product) => {
    return (
        <Product
          key={'product' + product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitter_avatar_url={product.submitter_avatar_url}
          product_image_url={product.product_image_url}
          onVote={this.handleVote}
        />
    );
  });
    return (
      <div>
        <div onClick={this.switchSort}>{this.state.sort}</div>
        <div className="ui items">
          {products}
        </div>
      </div>
    );
  },
});

const Product = React.createClass({
  handleUpVote: function() {
    this.props.onVote(this.props.id, +1);
  },
  handleDownVote: function() {
    this.props.onVote(this.props.id, -1);
  },
  render: function() {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.product_image_url} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleUpVote}>
              <i className='large caret up icon'/>
            </a>
            <a onClick={this.handleDownVote}>
              <i className='large caret down icon'/>
            </a>
              {this.props.votes}
          </div>
          <div className='description'>
            <a href={this.props.url}>
              {this.props.title}
            </a>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img
              className='ui avatar image'
              src={this.props.submitter_avatar_url}
            />
          </div>
        </div>
      </div>
    );
  },
});

ReactDOM.render(
<ProductList />,
document.getElementById('content')
)
