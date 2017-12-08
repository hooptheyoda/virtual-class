require 'test_helper'

class ClassroomSchedulesControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get classroom_schedules_new_url
    assert_response :success
  end

  test "should get edit" do
    get classroom_schedules_edit_url
    assert_response :success
  end

end
