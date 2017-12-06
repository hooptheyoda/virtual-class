require 'test_helper'

class ClassroomsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get classrooms_new_url
    assert_response :success
  end

  test "should get edit" do
    get classrooms_edit_url
    assert_response :success
  end

end
