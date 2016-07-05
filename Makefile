.PHONY: help docker docker-build docker-up docker-kill docker-rm npm npm-install npm-shrinkwrap npm-clean reset reset-hard

.DEFAULT_GOAL := help

# Grab list of arguments passed to command.
ARGUMENTS = $(wordlist 2, $(words $(MAKECMDGOALS)), $(MAKECMDGOALS))

# Common commands.
DOCKER = docker-compose
DOCKER_RUN = $(DOCKER) run --rm
DOCKER_RUN_WEB = $(DOCKER_RUN) web
NPM = $(DOCKER_RUN_WEB) npm
NPM_PRUNE = $(NPM) prune

help: ## Print help for this Makefile.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

docker: ## Run arbitrary docker-compose command.
	@$(DOCKER) $(ARGUMENTS) ||:

docker-build: ## Build docker files.
	@echo "\nRebuilding docker images."
	@$(DOCKER) build $(ARGUMENTS)

docker-up: ## Bring up docker containers.
	@echo "\nBringing up docker containers."
	@$(DOCKER) up -d $(ARGUMENTS)

docker-kill: ## Kill docker containers.
	@echo "\nKilling docker containers."
	@$(DOCKER) kill $(ARGUMENTS)

docker-rm: ## Remove docker containers.
	@echo "\nRemoving docker containers."
	@$(DOCKER) rm -f $(ARGUMENTS)

npm: ## Run arbitrary npm command.
	@$(NPM) $(ARGUMENTS) ||:

npm-install: ## Install npm dependencies.
	@echo "\nInstalling npm packages."
	@$(NPM_PRUNE)
	@$(NPM) install

npm-shrinkwrap: ## Generate npm shrinkwrap file.
	@echo "\nGenerating npm shrinkwrap."
	@$(NPM_PRUNE)
	@$(NPM) shrinkwrap --dev

npm-clean: ## Remove node_modules directory.
	@echo "\nRemoving npm packages."
	@$(DOCKER_RUN_WEB) rm -rf node_modules

reset: docker-kill docker-rm docker-build docker-up
reset-hard: docker-kill docker-rm docker-build npm-clean npm-install docker-up

# Don't do anything.
%:
	@:
