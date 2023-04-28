import { Component, Input } from '@angular/core';
import { AngularRenderer, Meta, StoryFn } from '@storybook/angular';
import {
  OptionType,
  TaskExecutionSchema,
  TaskExecutionSchemaInputMessage,
} from '@nx-console/shared/schema';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { GenerateUiComponentsModule } from '@nx-console/generate-ui/components';
import { FormatTaskPipe } from '../format-task/format-task.pipe';
import { TaskExecutionFormComponent } from './task-execution-form.component';

const cssColorNames = [
  'AliceBlue',
  'AntiqueWhite',
  'Aqua',
  'Aquamarine',
  'Azure',
  'Beige',
  'Bisque',
  'Black',
  'BurlyWood',
  'Crimson',
  'Cyan',
  'DarkViolet',
  'DeepSkyBlue',
  'FireBrick',
  'FloralWhite',
  'Gainsboro',
  'Grey',
  'Green',
  'HoneyDew',
  'IndianRed',
  'Ivory',
  'Khaki',
  'Lavender',
  'Lime',
  'LimeGreen',
  'Linen',
  'Magenta',
  'Maroon',
  'Moccasin',
  'NavajoWhite',
  'Navy',
  'OldLace',
  'Orchid',
  'PaleGoldenRod',
  'Purple',
  'RebeccaPurple',
  'Red',
  'SaddleBrown',
  'Salmon',
  'Silver',
  'Tan',
  'Tomato',
  'Turquoise',
  'Violet',
  'Wheat',
  'White',
  'Yellow',
];
const initialSchema: TaskExecutionSchema = {
  name: 'create',
  options: [
    {
      name: 'application',
      description: 'Application that the new domain libraries will belong to',
      type: OptionType.String,
      default: 'nxConsole',
      isRequired: true,
      aliases: ['a'],
      hidden: false,
      tooltip: 'What application will the new domain libraries be under?',
      itemTooltips: {},
    },
    {
      name: 'libraries',
      description: 'The library types that will be generated',
      type: OptionType.Array,
      isRequired: true,
      default: ['data-access', 'feature'],
      items: {
        enum: ['data-access', 'feature', 'shell', 'ui', 'util'],
        type: OptionType.String,
      },
      aliases: ['l'],
      hidden: false,
      tooltip: 'Which library types do you want to generate?',
      itemTooltips: {
        'data-access': 'data-access - for state management and services',
        feature: 'feature - for smart components (containers)',
        shell:
          'shell - for wrapping different libraries and exposing them as a single library. Also, for routing.',
        ui: 'ui - for dumb components',
        util: 'util - for model files, constants, validators, pipes and any other miscellaneous items, e.g. shared functions.',
      },
    },
    {
      name: 'style',
      description: 'The file extension to be used for style files.',
      type: OptionType.String,
      default: 'scss',
      isRequired: false,
      aliases: ['s'],
      hidden: false,
      tooltip: 'Which stylesheet format would you like to use?',
      itemTooltips: {
        css: 'CSS',
        scss: 'SASS(.scss) [http://sass-lang.com]',
        less: 'LESS        [http://lesscss.org]',
      },
      items: ['css', 'scss', 'less'],
    },
    {
      name: 'addE2EProject',
      description: 'Add a e2e cypress project',
      type: OptionType.Boolean,
      default: true,
      isRequired: false,
      aliases: [],
      hidden: false,
      tooltip: 'Add a cypress e2e app?',
      itemTooltips: {},
    },
    {
      name: 'color',
      description: 'Which color should be used?',
      type: OptionType.String,
      isRequired: false,
      default: cssColorNames[5],
      aliases: [],
      hidden: false,
      items: cssColorNames,
    },
  ],
  description: 'schematic description',
  command: 'generate',
  positional: '@scope:schematic',
};

const schemaWithoutDefaults: TaskExecutionSchema = {
  ...initialSchema,
  options: initialSchema.options.map((option) => {
    const optionWithoutDefault = { ...option };
    delete optionWithoutDefault.default;
    return optionWithoutDefault;
  }),
};

@Component({
  selector: 'generate-ui-task-execution-form-example',
  template: `
    <generate-ui-task-execution-form
      #component
    ></generate-ui-task-execution-form>
    <ng-container *ngIf="component.taskExecForm$ | async as taskExecForm">
      <ng-container *ngFor="let item of taskExecForm.form.value | keyvalue">
        <p [attr.data-cy]="item.key">{{ item.value }}</p>
      </ng-container>
    </ng-container>
  `,
})
class TaskExecutionFormExampleComponent {
  @Input() set schema(value: TaskExecutionSchema) {
    window.postMessage(new TaskExecutionSchemaInputMessage(value));
  }
}

const baseConfig: AngularRenderer['storyResult'] = {
  moduleMetadata: {
    imports: [
      CommonModule,
      ReactiveFormsModule,
      ClipboardModule,
      GenerateUiComponentsModule,
    ],
    declarations: [TaskExecutionFormComponent, FormatTaskPipe],
  },
};

export const DefaultValues: StoryFn = () => ({
  ...baseConfig,
  props: {
    schema: initialSchema,
  },
});

export const NoDefaultValues = () => ({
  ...baseConfig,
  props: {
    schema: schemaWithoutDefaults,
  },
});

const meta: Meta<TaskExecutionFormExampleComponent> = {
  component: TaskExecutionFormExampleComponent,
  title: 'feature-task-execution-form',
};
export default meta;
