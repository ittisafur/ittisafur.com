import { Fragment, FunctionComponent } from 'react';

import Header from './Header';

const FrontLayout: FunctionComponent = ({ children }: { children: any }) => {
    return (
        <Fragment>
            <Header />
            {children}
        </Fragment>
    );
};

FrontLayout.displayName = 'FrontLayout';

export default FrontLayout;
