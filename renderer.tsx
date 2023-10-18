import { Renderer } from "@k8slens/extensions";
import React from "react"

import { FluxcdObjectReconcileMenuItem, FluxcdObjectReconcileMenuItemProps } from "./src/menus/fluxcd-object-reconcile-menu-item";
import { FluxcdObjectSuspendResumeMenuItem, FluxCdObjectSuspendResumeMenuItemProps } from "./src/menus/fluxcd-object-suspend-resume-menu-item";
import { FluxCDDashboard } from './src/pages/dashboard'
import { FluxCDHelmReleases } from './src/pages/helmreleases'
import { FluxCDKustomizations } from './src/pages/kustomizations'
import { FluxCDGitRepositories } from './src/pages/gitrepositories'
import { FluxCDHelmRepositories } from './src/pages/helmrepositories'
import { FluxCDImageRepositories } from './src/pages/imagerepositories'
import { FluxCDBuckets } from './src/pages/buckets'
import { FluxCDKustomizationDetails } from './src/components/fluxcd-kustomization-details'
import { Kustomization, kustomizationApi } from './src/k8s/fluxcd/kustomization'
import { helmReleaseApi } from "./src/k8s/fluxcd/helmrelease";
import { gitRepositoryApi } from "./src/k8s/fluxcd/gitrepository";
import { helmRepositoryApi } from "./src/k8s/fluxcd/helmrepository";
import { imageRepositoryApi } from "./src/k8s/fluxcd/imagerepository";
import { helmChartApi } from "./src/k8s/fluxcd/helmchart";
import { bucketApi } from "./src/k8s/fluxcd/bucket";

const {
  Component: {
    Icon,
  }
} = Renderer;

type IconProps = Renderer.Component.IconProps;

export function FluxCDIcon(props: IconProps) {
  return <Icon {...props} material="pages" />;
}

const fluxcdObjects = [
  { kind: "Kustomization", apiVersions: ["kustomize.toolkit.fluxcd.io/v1beta1", "kustomize.toolkit.fluxcd.io/v1beta2", "kustomize.toolkit.fluxcd.io/v1"], api: kustomizationApi },
  { kind: "HelmRelease", apiVersions: ["helm.toolkit.fluxcd.io/v2beta1"], api: helmReleaseApi },
  { kind: "GitRepository", apiVersions: ["source.toolkit.fluxcd.io/v1beta1", "source.toolkit.fluxcd.io/v1beta2", "source.toolkit.fluxcd.io/v1"], api: gitRepositoryApi },
  { kind: "HelmChart", apiVersions: ["source.toolkit.fluxcd.io/v1beta1", "source.toolkit.fluxcd.io/v1beta2"], api: helmChartApi },
  { kind: "HelmRepository", apiVersions: ["source.toolkit.fluxcd.io/v1beta1", "source.toolkit.fluxcd.io/v1beta2"], api: helmRepositoryApi },
  { kind: "Bucket", apiVersions: ["source.toolkit.fluxcd.io/v1beta1", "source.toolkit.fluxcd.io/v1beta2"], api: bucketApi },
  { kind: "ImageRepository", apiVersions: ["image.toolkit.fluxcd.io/v1beta2"], api: imageRepositoryApi },
]

export default class FluxCDExtension extends Renderer.LensExtension {
  kubeObjectDetailItems = [{
    kind: "Kustomization",
    apiVersions: ["kustomize.toolkit.fluxcd.io/v1beta1", "kustomize.toolkit.fluxcd.io/v1beta2", "kustomize.toolkit.fluxcd.io/v1"],
    priority: 10,
    components: {
      Details: (props: Renderer.Component.KubeObjectDetailsProps<Kustomization>) => <FluxCDKustomizationDetails {...props} />
    }
  }]

  clusterPages = [
    {
      id: "dashboard",
      components: {
        Page: () => <FluxCDDashboard extension={this} />,
      }
    },
    {
      id: "helmreleases",
      components: {
        Page: () => <FluxCDHelmReleases extension={this} />,
      }
    },
    {
      id: "kustomizations",
      components: {
        Page: () => <FluxCDKustomizations extension={this} />,
      }
    },
    {
      id: "gitrepositories",
      components: {
        Page: () => <FluxCDGitRepositories extension={this} />,
      }
    },
    {
      id: "helmrepositories",
      components: {
        Page: () => <FluxCDHelmRepositories extension={this} />,
      }
    },
    {
      id: "imagerepositories",
      components: {
        Page: () => <FluxCDHelmRepositories extension={this} />,
      }
    },
    {
      id: "buckets",
      components: {
        Page: () => <FluxCDBuckets extension={this} />,
      }
    },
    {
      id: "imagerepositories",
      components: {
        Page: () => <FluxCDImageRepositories extension={this} />,
      }
    }
  ]

  clusterPageMenus = [
    {
      id: "fluxcd",
      title: "FluxCD",
      components: {
        Icon: FluxCDIcon,
      }
    },
    {
      id: "dashboard",
      parentId: "fluxcd",
      target: { pageId: "dashboard" },
      title: "Overview",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "helmreleases",
      parentId: "fluxcd",
      target: { pageId: "helmreleases" },
      title: "Helm Releases",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "kustomizations",
      parentId: "fluxcd",
      target: { pageId: "kustomizations" },
      title: "Kustomizations",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "sources",
      parentId: "fluxcd",
      title: "Sources",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "gitrepositories",
      parentId: "sources",
      target: { pageId: "gitrepositories" },
      title: "Git Repositories",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "helmrepositories",
      parentId: "sources",
      target: { pageId: "helmrepositories" },
      title: "Helm Repositories",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "buckets",
      parentId: "sources",
      target: { pageId: "buckets" },
      title: "Buckets",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "imageautomation",
      parentId: "fluxcd",
      title: "Image Automation",
      components: {
        Icon: null as any,
      }
    },
    {
      id: "imagerepositories",
      parentId: "imageautomation",
      target: { pageId: "imagerepositories" },
      title: "Image Repositories",
      components: {
        Icon: null as any,
      }
    },

  ]

  kubeObjectMenuItems =
    fluxcdObjects.map(el => {
      return {
        kind: el.kind,
        apiVersions: el.apiVersions,
        components: {
          MenuItem: (props: FluxcdObjectReconcileMenuItemProps) => <FluxcdObjectReconcileMenuItem {...props} api={el.api} />,
        }
      }
    })
      .concat(
        fluxcdObjects
          .map(el => {
            return {
              kind: el.kind,
              apiVersions: el.apiVersions,
              components: {
                MenuItem: (props: FluxCdObjectSuspendResumeMenuItemProps) => <FluxcdObjectSuspendResumeMenuItem api={el.api} {...props} />,
              }
            }
          })
      )

}
