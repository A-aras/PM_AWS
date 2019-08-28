import { Directive, OnInit, OnDestroy, Input, ViewContainerRef } from "@angular/core";

import { IReactiveCommand, IReactiveCommandCreator } from "./ireactive.command";
import { isCommandCreator } from "./command.util";
import { ReactiveCommand } from "./reactive.command";

/**
 * Command creator ref, directive which allows creating Command in the template
 * and associate it to a command (in order to share executions).
 *
 * ### Most common usage
 * ```html
 * <div class="action button-group" #actionCmd="reactiveCommandRef" [reactiveCommandRef]="{execute: removeHero$, canExecute: isValid$}">
 *    <button [ssvCommand]="actionCmd.command" [ssvCommandParams]="hero">
 *      Remove
 *    </button>
 *    <button [ssvCommand]="actionCmd.command" [ssvCommandParams]="hero">
 *       Remove
 *    </button>
 * </div>
 * ```
 *
 */

@Directive({
	selector: "[reactiveCommandRef]",
	exportAs: "reactiveCommandRef"
})
export class ReactiveCommandRefDirective implements OnInit, OnDestroy {

	@Input("reactiveCommandRef") commandCreator: IReactiveCommandCreator | undefined;

	get command(): IReactiveCommand { return this._command; }
	private _command!: IReactiveCommand;

	constructor(
		private viewContainer: ViewContainerRef
	) { }

	ngOnInit() {
		if (isCommandCreator(this.commandCreator)) {
			const isAsync = this.commandCreator.isAsync || this.commandCreator.isAsync === undefined;
			const hostComponent = (this.viewContainer as any)._view.component;

			const execFn = this.commandCreator.execute.bind(hostComponent);
			this._command = new ReactiveCommand(execFn, this.commandCreator.canExecute, isAsync);
		} else {
			throw new Error("reactiveCommandRef: [reactiveCommandRef] is not defined properly!");
		}
	}

	ngOnDestroy() {
		// console.log("[commandRef::destroy]");
		if (this._command) {
			this._command.destroy();
		}
	}
}