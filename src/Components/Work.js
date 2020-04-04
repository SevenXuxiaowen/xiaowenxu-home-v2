import React from 'react'


class Work extends React.Component {

    render() {

        const stacks = this.props.work.stack.map((stack, index) => {
            return (
                <div key={index} className="stack-tag">
                    {stack}
                </div>
            )
        })
        if (this.props.index % 2 === 0) {
            return (
                <div className="works-grid row">

                    <div className="col-6">
                        <div style={{ margin: "30px 10px 0 10px" }}>
                            <a className="btn-demo" href={this.props.work.gitHub}>GitHub</a>
                            {this.props.work.demo ? (<a className="btn-demo" href={this.props.work.demo}>Demo</a>) : null}
                        </div>
                        <div className="prgt-content grey">
                            <div>
                                <div className="title text-white">{this.props.work.title}</div>
                                <div>{stacks}</div>
                                <br />
                                <p>{this.props.work.short_description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6" style={{ overflow: "hidden" }}>
                        <img src={this.props.work.img} className="img-fluid" alt=" img to add" />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="works-grid row" >
                    <div className="col-6" style={{ overflow: "hidden" }}>
                        <img src={this.props.work.img} className="img-fluid" alt=" img to add" />
                    </div>

                    <div className="col-6">
                        <div style={{ margin: "30px 10px 0 10px" }}>
                            <a className="btn-demo" href={this.props.work.gitHub}>GitHub</a>
                            {this.props.work.demo ? (<a className="btn-demo" href={this.props.work.demo}>Demo</a>) : null}
                        </div>
                        <div className="prgt-content grey">
                            <div>
                                <div className="title text-white">{this.props.work.title}</div>
                                <div>{stacks}</div>
                                <br />
                                <p>{this.props.work.short_description}</p>
                            </div>
                        </div>
                    </div>

                </div>
            )
        }

    }
}

export default Work;