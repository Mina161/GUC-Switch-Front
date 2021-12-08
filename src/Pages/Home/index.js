import React from 'react'
import { connect } from 'react-redux'

export const Home = (props) => {
    return (
        <div className="main-page">
            <h1 className="text-center">Tutorial Pairing</h1>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
