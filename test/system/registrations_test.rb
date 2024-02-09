require "application_system_test_case"

class RegistrationsTest < ApplicationSystemTestCase
  test "registration" do
    visit root_path
    click_on 'Sign Up'
    fill_in "Email", with: 'foobar@example.com'
    fill_in "Password", with: :password
    assert_difference 'User.count' do
      click_on 'Sign Up!'
      assert_text "Hello World"
    end
  end
end
