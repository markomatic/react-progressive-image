import React, {
    Component
} from 'react';
import { ImageUrlSource } from 'react-stack-blur';

export default class ProgressiveImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        };

        this.onFullImageLoad = this.onFullImageLoad.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            loaded: this.state.loaded && nextProps.highUrl === this.props.highUrl
        });
    }

    render() {
        const {
            style,
            lowUrl,
            highUrl,
            width,
            height,
            blurRadius,
            renderOverlay
            } = this.props;

        let componentStyle = {
            padding: 0,
            margin: 0,
            top: 0
        };

        width && Object.assign(componentStyle, {
            width: `${width}px`
        });
        height && Object.assign(componentStyle, {
            height: `${height}px`
        });
        style && Object.assign(componentStyle, style);

        let highImageStyle = Object.assign({}, componentStyle);

        !this.state.loaded && Object.assign(highImageStyle, {
            display: 'none'
        });

        return (
            <div>
                {
                    !this.state.loaded
                    &&
                    <div>
                        {renderOverlay && renderOverlay(width, height)}
                        {
                            lowUrl
                            &&
                            <ImageUrlSource imageUrl={lowUrl}
                                            width={width}
                                            height={height}
                                            radius={blurRadius} />
                        }
                    </div>
                }
                <img style={highImageStyle}
                     src={highUrl}
                     onLoad={this.onFullImageLoad}/>
            </div>
        );
    }

    onFullImageLoad() {
        this.setState({
            loaded: true
        });
    }
}

ProgressiveImage.propTypes = {
    lowUrl: React.PropTypes.string,
    highUrl: React.PropTypes.string,
    blurRadius: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    renderOverlay: React.PropTypes.func
};

ProgressiveImage.defaultProps = {
    blurRadius: 10,
    width: 600,
    height: 190
};
