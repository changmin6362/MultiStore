package io.github.changmin6362.multistore.common.web;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import lombok.Getter;
import lombok.Setter;

/**
 * 공통 API 응답 래퍼. 각 컨트롤러들이 통일된 형태로 응답을 내려주게 함.
 * 기본 구조: { success, status?, message?, data? }
 */
@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse {
    private boolean success;
    private Integer status;
    private String message;
    @JsonUnwrapped
    private Object data;

    private ApiResponse(boolean success, Integer status, String message, Object data) {
        this.success = success;
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public static ApiResponse ok(Object data) {
        return new ApiResponse(true, null, null, data);
    }

    public static ApiResponse error(int status, String message) {
        return new ApiResponse(false, status, message, null);
    }
}
