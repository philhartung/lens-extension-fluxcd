import { Renderer, Common } from "@k8slens/extensions";
import React from "react";
import { HelmRepository } from "../k8s/fluxcd/sources/helmrepository";

const { Component: { DrawerItem } } = Renderer


export class FluxCDHelmRepositoryDetails extends React.Component<Renderer.Component.KubeObjectDetailsProps<HelmRepository>> {

  render() {
    const { object } = this.props

    return (
      <div>
        <DrawerItem name="Interval">{object.spec.interval}</DrawerItem>
        <DrawerItem name="Timeout">{object.spec.timeout}</DrawerItem>
        <DrawerItem name="Suspended">{object.spec.suspend === true ? 'Yes' : 'No'}</DrawerItem>
        <DrawerItem name="Url">
          <a href="#" onClick={e => { e.preventDefault(); Common.Util.openBrowser(object.spec.url) }}>
            {object.spec.url}
          </a>
        </DrawerItem>
      </div>
    )
  }
}

