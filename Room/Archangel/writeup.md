

% fibonacci.m
function fibSeq = fibonacci(n)
    % This function returns the first n Fibonacci numbers.
    if n <= 0
        error('Input must be a positive integer.');
    elseif n == 1
        fibSeq = 0;
    elseif n == 2
        fibSeq = [0, 1];
    else
        fibSeq = [0, 1];
        for i = 3:n
            fibSeq(i) = fibSeq(i-1) + fibSeq(i-2);
        end
    end
end
