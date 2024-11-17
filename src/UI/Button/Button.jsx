import classNames from 'classnames';
import './Button.scss';

function Button({ config: propsConfig = {}, additionalClasses = '', onClickAction, children }) {
    const defaultConfig = {
        visualType: 'primary',
        type: 'button',
        size: 'sm'
    };
    const config = {
        ...defaultConfig,
        ...propsConfig
    };

    return (
        <button
            className={classNames([config.size, config.visualType], "button rounded bg-none border-none transition-colors duration-200 cursor-pointer", [additionalClasses])}
            type={config.type}
            onClick={onClickAction}
        >
            {children}
        </button>
    )
}

export default Button;
