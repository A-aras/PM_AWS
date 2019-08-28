import { AbstractControl, AbstractControlDirective } from "@angular/forms";
import { Observable } from "rxjs";
import { map, distinctUntilChanged, startWith } from "rxjs/operators";

import { IReactiveCommandCreator, IReactiveCommand } from "./ireactive.command";
import { ReactiveCommand } from "./reactive.command";

/** Determines whether the arg object is of type `Command`. */
export function isCommand(arg: any): arg is IReactiveCommand {
	return arg instanceof ReactiveCommand;
}

/** Determines whether the arg object is of type `CommandCreator`. */
export function isCommandCreator(arg: any): arg is IReactiveCommandCreator {
	if (arg instanceof ReactiveCommand) {
		return false;
	} else if (arg.execute) {
		return true;
	}
	return false;
}

/** Get form is valid as an observable. */
export function canExecuteFromNgForm(form: AbstractControl | AbstractControlDirective): Observable<boolean> {
	return form.statusChanges!.pipe(
		startWith(form.valid),
		map(() => !!form.valid),
		distinctUntilChanged(),
	);
}