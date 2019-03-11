import React from 'react'
import { connect } from 'react-redux'
import Loading from '../../layout/styled-components/spinner'
import { requestProducts, filterProducts } from '../../../store/products/thunks'
import Content from './containers/content'
import Filter from './components/filter'
import Grid from './components/grid'
import ProductList from './components/productList'
import Sidebar from './components/sidebar'
import Button from '../../layout/styled-components/button'
import Title from '../../layout/styled-components/title'
import Search from './containers/searchForm'
import {
	filter as _filter
} from 'lodash'


class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			openSidebar: false
		}
		this.handleSidebar = this.handleSidebar.bind(this)
	}
	componentDidMount() {
		const { requestProducts, auth } = this.props
		requestProducts(auth.user.auth_token);
	}
	
	handleSidebar() {
		if(!this.state.openSidebar) {
			this.setState({
				openSidebar: true
			})
		} else {
			this.setState({
				openSidebar: false
			})
		}
	}

	handleSubmit = async ({term}) => {
		// criar thunk para filtrar por qualquer termo
		const filtered = _filter(this.props.products.list, (i) => 
      i.item.indexOf(term)>-1
    )
    return await this.props.filterProducts(filtered)
  }

	render() {
		const { auth, products } = this.props
		return (
			<Content>
				<Loading show={products.loading} />
				<Filter>
					<i className="fa fa-filter" onClick={this.handleSidebar} />
					<Title>Bem vindo {auth.user.name}</Title>
					<Search onSubmit={this.handleSubmit} />
				</Filter>
				<Grid>
					<Sidebar open={this.state.openSidebar} />
					<ProductList {...products} />
				</Grid>
				{/* <Button red>Colors!</Button>
				<Button green>Colors!</Button>
				<Button>Colors!</Button>
				<Button yellow>Colors!</Button> */}
			</Content>
		)
	}
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    products: state.products
});

export default connect(mapStateToProps, {
    requestProducts,
    filterProducts
})(Home)