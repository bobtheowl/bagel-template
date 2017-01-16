# Bagel Template
Lightweight Javascript templates for HTML elements

## Installation

Bagel Template can be installed with Bower:

`bower install bagel-template`

## Basic Usage

Set up an HTML element which contains a template:

    <script type="text/x-template" id="some-template">
        <div class="{class}" data-some-attr="{data}">
            {content}
        </div>
    </script>

Create a BagelTemplate instance:

    var template = new BagelTemplate('some-template');

Pass some data to the template:

    var html = template.make({
        class: 'some-class',
        data: 'Data attribute content',
        content: '<span>Content of the div</span>'
    });

You now have html with the placeholder values replaced:

    <div class="some-class" data-some-attr="Data attribute content">
        <span>Content of the div</span>
    </div>

## Options

When creating a BagelTemplate instance, you can pass an object containing options as an optional second parameter.

### Change Placeholder Delimiters

Placeholder delimiters don't need to be limited to `{` and `}`. Set them with the `delimiters` option:

    <script type="text/x-template" id="some-template">
        <div class="{!!class!!}" data-some-attr="{!!data!!}">
            {!!content!!}
        </div>
    </script>

    var template = new BagelTemplate('some-template', {delimiters: ['{!!', '!!}']});

### Set Optional Placeholders

Set placeholders as optional and they will be replaced with an empty string (or a string of your choosing) if no data is supplied.

    var template = new BagelTemplate('some-template', {optional: ['data']});

    var html = template.make({
        class: 'some-class',
        content: '<span>Content of the div</span>'
    });

Outputs:

    <div class="some-class" data-some-attr="">
        <span>Content of the div</span>
    </div>

Or set a default value:

    var template = new BagelTemplate('some-template', {
        optional: ['data'],
        defaultTo: 'Bagel templates are great!'
    });

    var html = template.make({
        class: 'some-class',
        content: '<span>Content of the div</span>'
    });

Outputs:

    <div class="some-class" data-some-attr="Bagel templates are great!">
        <span>Content of the div</span>
    </div>

### Set Modifiers on Values

Receiving data from the back-end in not quite the right format? Set modifiers on those placeholders so you don't have to call a function each time to get the value in the format you need.

    var template = new BagelTemplate('some-template', {
        modifiers: {
            data: function (originalValue) {
                return originalValue.toLowerCase();
            }
        }
    });

    var html = template.make({
        class: 'some-class',
        data: 'SOME UPPERCASE CONTENT',
        content: '<span>Content of the div</span>'
    });

    <div class="some-class" data-some-attr="some uppercase content">
        <span>Content of the div</span>
    </div>

## Advanced Usage

### Dot Notation in Placeholders

Sometimes you receive data that comes from something like Eloquent, which contains relationships nested in the object. To handle these cases, Bagel Templates support using dot notation.

Let's say your data looks like this:

    var data = {
        title: 'Some Title',
        body: 'Some body text.',
        author: {
            name: 'Jacob Stair'
        }
    };

You can display the author's name by using this placeholder:

    <script type="text/x-template" id="some-template">
        <div class="post">
            <h3 class="post-title">{title}</h3>
            <div class="author-name">{author.name}</div>
            <div class="body-text">{body}</div>
        </div>
    </script>
