.PHONY: help npm npm-run npm-install clean test build

.DEFAULT_GOAL := help

# Grab list of arguments passed to command.
ARGUMENTS = $(wordlist 2, $(words $(MAKECMDGOALS)), $(MAKECMDGOALS))

# Common commands.
DOCKER = docker-compose
DOCKER_RUN = $(DOCKER) run --rm main
NPM = $(DOCKER_RUN) npm

help: ## Print help for this Makefile.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

npm: ## Run arbitrary npm command.
	@$(NPM) $(ARGUMENTS) ||:

npm-run: ## Run npm script defined in package.json
	@$(NPM) run -s $(ARGUMENTS)

npm-install: ## Install npm dependencies.
	@$(NPM) prune
	@$(NPM) install

clean: ## Clean up directory.
	@$(DOCKER_RUN) rm -rf node_modules
	@$(DOCKER_RUN) rm npm-debug.log

test: ## Run unit tests.
	@$(DOCKER_RUN)

build: ## Build the prod bundle.
	@$(DOCKER_RUN) npm run build

publish: ## Publish project to npm registry
	@make build
	@npm publish ./dist

# Don't do anything.
%:
	@:
