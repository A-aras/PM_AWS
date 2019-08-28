// credits : https://github.com/sketch7/ngx.command/blob/master/src/command.ts
import { Observable } from "rxjs";

export interface IReactiveCommand {
	/** Determines whether the command is currently executing, as a snapshot value. */
	readonly isExecuting: boolean;
	/** Determines whether the command is currently executing, as an observable. */
	readonly isExecuting$: Observable<boolean>;
	/** Determines whether the command can execute or not, as a snapshot value. */
	readonly canExecute: boolean;
	/** Determines whether the command can execute or not, as an observable. */
	readonly canExecute$: Observable<boolean>;

	/** Determines whether to auto destroy when having 0 subscribers (defaults to `true`). */
	autoDestroy: boolean;

	/** Execute function to invoke. */
	execute(...args: any[]): void;

	/** Disposes all resources held by subscriptions. */
	destroy(): void;

	/** Subscribe listener, in order to handle auto disposing. */
	subscribe(): void;

	/** Unsubscribe listener, in order to handle auto disposing. */
	unsubscribe(): void;
}

export interface IReactiveCommandCreator {
	execute: (...args: any[]) => Observable<any> | Promise<any> | void;
	canExecute?: Observable<boolean>;
	params: any | any[];
	isAsync?: boolean;
}