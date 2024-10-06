# AWSP Plus - Upgraded AWS Profile Switcher

## :warning: Archived

This application is archived and no longer maintained. A drop in replacement is available at [abyss/go-awsp](https://github.com/abyss/go-awsp). Please visit the new repository for any updates and improvements as well as better cross-system compatibility.

## Introduction
Easily switch between AWS Profiles.

Expanded fork of [awsp by johnnyopao](https://github.com/johnnyopao/awsp) with additional features and ongoing maintenance.*

\* no guarantee expressed or implied.

<img src="demo.gif" width="500">

## How it works

The AWS CLI will use the profile present in the `AWS_PROFILE` environment variable, if no flag is set. This script parses the current aws profiles (`~/.aws/config`) and provides a filterable list, and then sets that environment variable based on your selection.

## Prerequisites
Set up any number of profiles using the aws cli.

```sh
aws configure --profile PROFILE_NAME
```

You can also leave out the `--profile PROFILE_NAME` param to set your `default` credentials

Refer to the AWS CLI Documentation for more information:
https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html

## Setup

```sh
npm install -g awsp-plus
```

Add the following line to your `.bashrc` or `.zshrc` config:
```sh
alias awsp="source _awspp"
```

> An alias is used because `_awspp` needs to be sourced to be able to modify the calling shell's environment variables.

## Usage
Standard usage is just to call `awsp` and select a profile:
```sh
awsp
```
You can type to filter the list, or arrow through the shown options. Press \<Enter\> to select the highlighted option.

You can also type a profile with the command to immediately switch:
```sh
awsp development
```
This is equivalent to `export AWS_PROFILE='development'`.

## Recommendation: Show your AWS Profile in your shell prompt
For better visibility into which AWS Profile is selected it's helpful to configure your prompt to show the value of the env variable `AWS_PROFILE`.

<img src="screenshot.png" width="300">

### Examples
Here is a simplified example:
```sh
function aws_prof {
  local profile="${AWS_PROFILE:=default}"

  echo "aws:(${profile})"
}

PS1="$PS1 \$(aws_prof)"
```

Here's [@johnnyopao](https://github.com/johnnyopao)'s example using oh-my-zsh themes, with nice colors:

```sh
function aws_prof {
  local profile="${AWS_PROFILE:=default}"

  echo "%{$fg_bold[blue]%}aws:(%{$fg[yellow]%}${profile}%{$fg_bold[blue]%})%{$reset_color%} "
}

PROMPT='OTHER_PROMPT_STUFF $(aws_prof)'
```

A more advanced example for bash can be found in my dotfiles at [https://github.com/abyss/dotfiles](https://github.com/abyss/dotfiles/blob/main/bin/aws-prompt.sh).

## Contributing
Issues and pull requests are welcome. 😄

## License
This project and the original work are licensed under the [ISC License](LICENSE.md).

Copyright (c) 2021 Abyss

Original Work Copyright (c) 2020 Johnny Opao (@ https://github.com/johnnyopao/awsp)
