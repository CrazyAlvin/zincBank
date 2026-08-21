Feature: Login
  As a ZINC Bank customer
  I want to log in with my credentials
  So that I can securely access my account

  # Runs before every scenario in this feature.
  Background:
    Given I am on the login page

  @smoke @US00-AC2
  Scenario: US00-AC2 - Valid login with correct credentials
    When I log in with email "student03@zinc.test" and password "3YFh7M9GNvBl"
    Then I should be successfully logged in
