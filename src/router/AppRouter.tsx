import React, {ReactNode} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Account} from "../components/Account";
import {Home} from "../components/Home";
import {inject, observer} from "mobx-react";
import {ContainerPage} from "../components/Container";
import {RootStoreProps} from "../store/RootStore";
import {Groups} from "../components/Groups";
import {Group} from "../components/Group";
import {ErrorPage} from "../components/ErrorPage";


@inject("rootStore")
@observer
export class AppRouter extends React.Component<RootStoreProps> {
    render(): ReactNode {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={(props) => <ContainerPage {...props}><Home {...props} /></ContainerPage>}
                    />
                    <Route
                        exact
                        path={["account", "/account"]}
                        render={(props) => <ContainerPage {...props}><Account {...props} /></ContainerPage>}
                    />
                    <Route
                        exact
                        path={["groups", "/groups"]}
                        render={(props) => <ContainerPage {...props}><Groups {...props} /></ContainerPage>}
                    />
                    <Route
                        exact
                        path={["groups/:groupId", "/groups/:groupId"]}
                        render={(props) => <ContainerPage {...props}><Group {...props} /></ContainerPage>}
                    />
                    <Route
                        exact
                        path={["*"]}
                        render={(props) => <ContainerPage {...props}><ErrorPage {...props} /></ContainerPage>}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}
