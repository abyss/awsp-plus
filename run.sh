#!/bin/sh

if [ $# -eq 0 ]; then
  AWS_PROFILE="$AWS_PROFILE" _awspp_prompt
  if [ -f "$HOME/.awsp" ]; then selected_profile=$(cat "$HOME/.awsp"); fi
else
  selected_profile="$*"
  echo "$selected_profile" > "$HOME/.awsp"
fi

if [ -z "$selected_profile" ] || [ "$selected_profile" = "default" ]; then
  unset AWS_PROFILE
else
  export AWS_PROFILE="$selected_profile"
fi
