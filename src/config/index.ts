
import type { Component } from "vue";

export const Comp = new Map<string, Component>();


export const config = function(name: string, component: Component) {
  if (name && component) {
    Comp.set(name, component);
  }
}