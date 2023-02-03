import {
  style,
  transition,
  trigger,
  animate,
  state,
} from '@angular/animations';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PokemonType, resolveColor } from 'src/app/models/pokemon/pokemon-type';
import { capFirstCharacter } from 'src/app/utils/string.utils';

const FADE_TIME_MS = 400;

@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.css'],
  animations: [
    trigger('fade', [
      state('false', style({ opacity: 0 })),
      state('true', style({ opacity: 1 })),
      transition('false => true', animate(`${FADE_TIME_MS}ms ease-in`)),
      transition('true => false', animate(`${FADE_TIME_MS}ms ease-out`)),
    ]),
  ],
})
export class DetailsCardComponent implements OnDestroy, OnChanges {
  @Input() pokemon?: Pokemon;

  private currentTextIndex: number = -1;
  private interval = interval(5000);
  private sub$: Subscription;
  public flavorText?: string;
  public fade: boolean = true;

  constructor() {
    this.sub$ = this.interval.subscribe((val) => {
      this.refreshText();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.flavorText = this.pokemon?.flavorTexts?.[0] ?? '';
  }

  private refreshText() {
    this.fade = false;

    setTimeout(() => {
      let nextIndex = this.currentTextIndex + 1;
      if (nextIndex >= (this.pokemon?.flavorTexts?.length ?? -1)) {
        nextIndex = 0;
      }
      this.currentTextIndex = nextIndex;
      this.flavorText = this.pokemon?.flavorTexts?.[nextIndex] ?? '';
    }, FADE_TIME_MS);

    setTimeout(() => {
      this.fade = true;
    }, FADE_TIME_MS * 2);
  }

  public resolveTypeColor(type: PokemonType): string {
    return resolveColor(type.type.name);
  }

  public resolveTypeColorStr(type: string): string {
    return resolveColor(type);
  }

  public capFirst(str: string): string {
    return capFirstCharacter(str);
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
